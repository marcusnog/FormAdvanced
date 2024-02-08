using Zuri.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Zuri.Infrastructure.Repositories
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> GetUsuariosAsync();
        Task CreateUsuarioAsync(Usuario usuario);
    }
}
