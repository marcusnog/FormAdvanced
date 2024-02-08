using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Zuri.Domain.Entities;
using Zuri.Domain.Services;

namespace Zuri.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuariosAsync()
        {
            var usuarios = await _usuarioService.GetUsuariosAsync();
            return Ok(usuarios);
        }

        [HttpPost("Criar")]
        public async Task<ActionResult> CreateUsuarioAsync(Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                await _usuarioService.CreateUsuarioAsync(usuario);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
