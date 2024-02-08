using Zuri.Domain.Entities;

namespace Zuri.Domain.Services
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetUsuariosAsync();
        Task CreateUsuarioAsync(Usuario usuario);
    }
}
