using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoetryHub.Models
{
    public interface IPoemRepository: IDisposable
    {
        IEnumerable<Poem> FindAll();

        Poem Get(int id);

        void Update(Poem poem);

        Poem Add(Poem poem);

        Poem Delete(int id);

        int SaveChanges();
    }
}
