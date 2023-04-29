namespace Streamish.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        System.Collections.Generic.List<UserProfile> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        UserProfile GetUserByIdWithVideos(int id);
        void Update(UserProfile userProfile);
    }
}