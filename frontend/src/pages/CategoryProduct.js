import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";
import productCategory from "../helpers/productCategory";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectedCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  }

  const handleSelectCategory = (e) => {
    const {value, checked} = e.target;

    setSelectedCategory((prev) => {
      return {
        ...prev,
        [value] : checked
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target;
    setSortBy(value);

    if (value === "asc") {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === "desc") {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/*desktop version*/}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/*left side*/}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/*sort by*/}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === "desc"} value={"desc"} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/*filter by*/}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName) => (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={"category"}
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/*right side*/}
        <div className="px-4">
          <p>Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading}/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct;
