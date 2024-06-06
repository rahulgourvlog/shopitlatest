class apiFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    // Check if a keyword is provided in the query string
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //// Case-insensitive matching
          },
        }
      : {};
    /*
      The following example uses the i option perform a case-insensitive match for documents 
      with sku value that starts with ABC.
            db.products.find( { sku: { $regex: /^ABC/i } } )
    */

    // Apply the keyword filter to the existing query
    this.query = this.query.find({ ...keyword });
    // regex it search the name in the whole name not exact match wherever it will in name

    // Return the instance for method chaining
    return this;
  }

  filter() {
    // Create a copy of the query object to avoid modifying the original
    let queryCopy = { ...this.queryStr };
    //console.log(queryCopy);

    // Remove the keyword object
    let removedKeywordQuery = ["keyword","page"];
    // Fields to remove from the copied query object to filter (ex: category or price[gte]=100)
    removedKeywordQuery.forEach((el) => delete queryCopy[el]);
    //console.log(queryCopy)

    // advance filter for price, ratings
    let queryStr = JSON.stringify(queryCopy);
    // Converted to string and adding a $ sign in the query {price:{gte: 100} ==> {price:{$gte: 100}}
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);

    //     const originalString = 'Hello, world!';
    // const newString = originalString.replace('world', 'everyone');
    //serch the query in model
    // Apply the filtered query to the existing query
    this.query = this.query.find(JSON.parse(queryStr));

    // Return the instance for method chaining
    return this;
  }

  pagination(resPerPage){
    // server side pagination 
     // Extract the current page from the query string or default to 1
    const currentPage=this.queryStr.page|| 1;

        // Calculate the number of documents to skip based on the current page and results per page
    const skip=resPerPage*(currentPage-1);
    this.query=this.query.limit(resPerPage).skip(skip);
      // Return the instance for method chaining
    return this
  }
}

export default apiFilters;
