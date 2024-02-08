using Zuri.Domain.Entities;
using Zuri.Domain.Services;
using Zuri.Infrastructure.Repositories;

namespace Zuri.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<IEnumerable<Usuario>> GetUsuariosAsync()
        {
            return await _usuarioRepository.GetUsuariosAsync();
        }

        public async Task CreateUsuarioAsync(Usuario usuario)
        {
            await _usuarioRepository.CreateUsuarioAsync(usuario);
        }
    }
}
