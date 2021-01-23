export default function eom({ data }) {
  console.log(">>", data);
  return (
    <div>
      <div>
        <h1>Employee of the moth header</h1>
      </div>

      <div>
        <h3>Title: {data.title}</h3>
        <h4>Id: {data.id}</h4>
        <h1>Status: {String(data.completed)}</h1>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  const note = await apiResponse.json();

  return {
    props: {
      data: note,
    },
  };
};
