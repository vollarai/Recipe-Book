using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBook.Data;
using RecipeBook.Models;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace RecipeBook.Controllers;

public record RegisterRequest(string Email, string Password, string UserName);
public record LoginRequest(string Email, string Password);

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db, IConfiguration config) : ControllerBase
{
    private readonly IConfiguration _config = config;
    private static string Hash(string input)
    {
        using var sha = SHA256.Create();
        return Convert.ToHexString(sha.ComputeHash(Encoding.UTF8.GetBytes(input)));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest req)
    {
        if (await db.Users.AnyAsync(u => u.Email == req.Email))
            return BadRequest(new { message = "User with this email already exists" });

        var user = new User
        {
            Email = req.Email,
            UserName = req.UserName,
            PasswordHash = Hash(req.Password)
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return Ok(new { message = "User registered successfully", user.Id, user.Email });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest req)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
        if (user == null || user.PasswordHash != Hash(req.Password))
            return Unauthorized(new { message = "Invalid email or password" });

        var token = GenerateJwtToken(user);
        return Ok(new
        {
            message = "Login successful",
            user.Id,
            user.Email,
            user.UserName,
            token
        });
    }
    private string GenerateJwtToken(User user)
    {
        var jwtSection = _config.GetSection("Jwt");
        var key = jwtSection["Key"];
        var issuer = jwtSection["Issuer"];
        var audience = jwtSection["Audience"];

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("userName", user.UserName ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}