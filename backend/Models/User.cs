using System.Collections.Generic;

namespace RecipeBook.Models;

public class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;
    public string UserName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
