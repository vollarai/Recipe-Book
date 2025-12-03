using System.Security.Claims;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBook.Data;       
using RecipeBook.Models;    

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class RecipesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public RecipesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private int? GetUserId()
        {
            var idString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(idString, out var id))
            {
                return id;
            }
            return null;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeResponseDto>>> GetMyRecipes()
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var recipes = await _dbContext.Recipes
                .Where(r => r.UserId == userId.Value)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new RecipeResponseDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    Ingredients = r.Ingredients,
                    Steps = r.Steps,
                    CreatedAt = r.CreatedAt,
                    ImageUrl = r.ImageUrl,
                    Category = r.Category
                })
                .ToListAsync();

            return Ok(recipes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<RecipeResponseDto>> GetRecipe(int id)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var recipe = await _dbContext.Recipes
                .Where(r => r.Id == id && r.UserId == userId.Value)
                .FirstOrDefaultAsync();

            if (recipe == null)
            {
                return NotFound();
            }

            var dto = new RecipeResponseDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Description = recipe.Description,
                Ingredients = recipe.Ingredients,
                Steps = recipe.Steps,
                CreatedAt = recipe.CreatedAt,
                ImageUrl = recipe.ImageUrl,
                Category = recipe.Category
            };

            return Ok(dto);
        }
        
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<RecipeResponseDto>> CreateRecipe([FromForm] RecipeCreateDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var recipe = new Recipe
            {
                Title = dto.Title,
                Description = dto.Description,
                Ingredients = dto.Ingredients,
                Steps = dto.Steps,
                Category = dto.Category,
                UserId = userId.Value
            };

            if (dto.Image != null)
            {
                var folder = Path.Combine("wwwroot", "images");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var fullPath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                recipe.ImageUrl = "/images/" + fileName;
            }

            _dbContext.Recipes.Add(recipe);
            await _dbContext.SaveChangesAsync();

            var response = new RecipeResponseDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Description = recipe.Description,
                Ingredients = recipe.Ingredients,
                Steps = recipe.Steps,
                CreatedAt = recipe.CreatedAt,
                ImageUrl = recipe.ImageUrl,
                Category = recipe.Category
            };
            
            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, response);
        }

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateRecipe(int id, [FromForm] RecipeUpdateDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var recipe = await _dbContext.Recipes
                .Where(r => r.Id == id && r.UserId == userId.Value)
                .FirstOrDefaultAsync();

            if (recipe == null)
            {
                return NotFound();
            }

            recipe.Title = dto.Title;
            recipe.Description = dto.Description;
            recipe.Ingredients = dto.Ingredients;
            recipe.Steps = dto.Steps;
            recipe.Category = dto.Category;

            if (dto.Image != null)
            {
                var folder = Path.Combine("wwwroot", "images");
                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var fullPath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                recipe.ImageUrl = "/images/" + fileName;
            }

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var recipe = await _dbContext.Recipes
                .Where(r => r.Id == id && r.UserId == userId.Value)
                .FirstOrDefaultAsync();

            if (recipe == null)
            {
                return NotFound();
            }

            _dbContext.Recipes.Remove(recipe);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
