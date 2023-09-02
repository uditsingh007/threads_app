import { redirect } from "next/navigation";
import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>
      {/* Search Bar */}
      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No communities found</p>
        ) : (
          <>
            {result.communities.map(
              ({ id, name, username, image, bio, members }) => (
                <CommunityCard
                  key={id}
                  id={id}
                  name={name}
                  username={username}
                  imgUrl={image}
                  bio={bio}
                  members={members}
                />
              )
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
