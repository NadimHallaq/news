export default function Feed({ pageNumber, data }) {
  console.log(data);
  return (
    <div>
      <h1>Hello from feed</h1>
      {data.map((e) => {
        return (
          <>
            <h1>{e.title}</h1>
            <img src={e.urlToImage} />
            <h4>{e.description}</h4>
          </>
        );
      })}
      <h1></h1>

      <hr />
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}&apiKey=3f0f651595a84c7980d8487aca7e3c9f`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const apiJson = await apiResponse.json();
  console.log(apiJson);

  return {
    props: {
      data: apiJson.articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
