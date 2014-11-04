using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using Newtonsoft.Json;

namespace PoetryHub.Models
{
    public class Poem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Title { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Author { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm:ssZ}")]
        public DateTime CreatedOn { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm:ssZ}")]
        public DateTime LastModified { get; set; }

        public string Content { get; set; }
        
        public Poem()
        {
            // defaults
            Title = "Untitled";
            Author = "Anonymous";
            CreatedOn = DateTime.UtcNow;
            LastModified = CreatedOn;
        }
    }
}