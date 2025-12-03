using System;

namespace backend.Dtos
{
    public class RecipeCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
        public IFormFile? Image { get; set; }
        public string Category { get; set; } = "Other";
    }

    public class RecipeUpdateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
        public IFormFile? Image { get; set; }
        public string Category { get; set; } = "Other";
    }

    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ImageUrl { get; set; }
        public string Category { get; set; } = "Other";
    }
}
