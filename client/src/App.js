import { useState } from "react";
import Product from "./components/Product";
import { FaTimes, FaSearch } from "react-icons/fa";
import { Loader } from "./components/Loader";
import useProducts from "./hooks/useProducts";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");

  const { products, loading, message, appClass } = useProducts(query);

  const handleClear = () => {
    setValue("");
    setQuery("");

    console.log("clear");
  };

  const handleKeyDown = e => {
    if (value.length < 2 || value.length > 25) return;

    if (e.keyCode === 13) {
      setQuery(value);
    }
  };

  return (
    <div className={`app ${appClass}`}>
      <div className="input-main-container">
        <div className="input-container">
          <input
            value={value}
            type="text"
            placeholder="Search"
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={25}
            minLength={2}
          />

          <div className="input-icons-container">
            {value && (
              <div className="input-icon" onClick={handleClear}>
                <FaTimes />
              </div>
            )}

            <div className="input-icon" onClick={() => handleKeyDown({ keyCode: 13 })}>
              <FaSearch />
            </div>
          </div>
        </div>

        <span className="input-length">{value.length} / 25</span>
      </div>

      {appClass === "" && (
        <div className="welcome">
          <h1>Search for your desired products that are on sale across multiple stores</h1>
          <div className="welcome-stores">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vimvic.cz%2Fupload%2Fthumbnails%2Fimage-110--fit-11062.png&f=1&nofb=1&ipt=1c6ca041adc11894a458b3f5a910758fa74683ff2133f2034622f6fd0209eb4e&ipo=images"
              alt="Kaufland"
            />
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2q79iu7y748jz.cloudfront.net%2Fs%2F_squarelogo%2F73bb88a364e45a3f5df88bb24cf101d9&f=1&nofb=1&ipt=317da071bef96625df64a245167fcb38f0d4b8d4983a57994edfba23b111e24d&ipo=images"
              alt="Penny"
            />
          </div>
        </div>
      )}
      {message && <div className="message">{message}</div>}

      {loading && (
        <div className="loading-container">
          {[
            ...Array(Math.min(4, Math.floor((window.innerWidth - 240) / 240)))
              .fill(0)
              .map((x, i) => <Loader key={i} />),
          ]}
        </div>
      )}

      {products?.map(product => {
        return (
          <div key={product.store} className="container">
            <h1>
              {product.store} - {product.items.length} items found
            </h1>
            <div className="products-container">
              {product.items.map(item => {
                return <Product key={item.name} data={item} />;
              })}
            </div>
          </div>
        );
      })}

      <ScrollToTopButton />
    </div>
  );
}

export default App;
