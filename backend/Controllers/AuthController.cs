using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBook.Data;
using RecipeBook.Models;
using System.Security.Cryptography;
using System.Text;

namespace RecipeBook.Controllers;

public record RegisterRequest(string Email, string Password, string UserName);
public record LoginRequest(string Email, string Password);

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db) : ControllerBase
{
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

        return Ok(new
        {
            message = "Login successful",
            user.Id,
            user.Email,
            user.UserName
        });
    }
}