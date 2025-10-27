// import ListView from '@/components/list-view';
import ListView from '@/components/list-view';
import NewListButton from '@/components/newlist-button';
import { ItemGroup } from '@/components/ui/item';
import { retrieveTaskAction } from '@/lib/actions';

export default async function Home() {
  const myList = await retrieveTaskAction();
  return (
    <div className="container mx-auto py-8 px-16 flex flex-col justify-center items-center gap-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold">My List</h1>
        <NewListButton />
      </div>

      {/* Todo List */}
      {myList.length > 0 ? (
        <ItemGroup className="w-full max-w-xl gap-4">
          {myList.map(task => (
            <ListView key={task.id} {...task} />
          ))}
        </ItemGroup>
      ) : (
        <p className="italic">Nothing added to the list</p>
      )}
    </div>
  );
}
