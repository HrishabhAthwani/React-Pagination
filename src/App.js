import "./styles.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState(10);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://dummyjson.com/products?limit=111")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.products);
          setProducts(data.products);
        });
    };
    fetchData();
  }, []);

  const noOfPages = useMemo(
    () => Math.ceil(products.length / perPageCount),
    [products.length, perPageCount]
  );
  const start = useMemo(
    () => (currentPage - 1) * perPageCount,
    [perPageCount, currentPage]
  );
  const end = useMemo(() => start + perPageCount, [perPageCount, start]);

  const handleClick = useCallback((e) => {
    setCurrentPage(Number(e.target.innerText));
  }, []);

  const handleChange = useCallback(
    (e) => {
      setPerPageCount(Number(e.target.value));
      if (currentPage > noOfPages) {
        setCurrentPage(1);
      }
    },
    [products.length, currentPage]
  );

  console.log("rendered");
  return (
    <div className="App">
      <div className="products-container">
        <div>
          {products.slice(start, end).map((prd) => (
            <span className="product-item" key={prd.id}>
              {prd.id}. {prd.title}
            </span>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="PGT-main">
          <button
            className="prev-btn nav-btn"
            disabled={currentPage == 1}
            onClick={() => {
              setCurrentPage(Number(currentPage) - 1);
            }}
          >
            Prev
          </button>

          {Array.from({ length: noOfPages }, (_, i) => (
            <div
              key={i + 1}
              onClick={handleClick}
              className={`pgt-button ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </div>
          ))}
          <button
            className="next-btn nav-btn"
            disabled={currentPage == noOfPages}
            onClick={() => {
              setCurrentPage(Number(currentPage) + 1);
            }}
          >
            Next
          </button>
        </div>
        <select
          onChange={handleChange}
          name="perPageCountSelector"
          id="perPageCountSelector"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}
