import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserSearch(query = "") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [appClass, setAppClass] = useState("");

  useEffect(() => {
    setError(false);
    setMessage("");
    setProducts([]);
    if (query === "") setAppClass("");
  }, [query]);

  useEffect(() => {
    if (query === "" || query.length < 2 || query.length > 25) return;

    const controller = new AbortController();

    setLoading(true);
    setError(false);

    axios
      .get(`/api/products?query=${query}`, { signal: controller.signal })
      .then(res => {
        console.log(res.data);

        setProducts(res.data);

        if (res.data.length === 0) {
          setMessage("Literally 0 results for your search 🤡");
          setAppClass("empty");
        } else {
          setAppClass("good");
        }
      })
      .catch(err => {
        setProducts([]);
        setError(true);

        if (err.response.status === 500) setMessage("There are some problems with the server, try again later 😴");
        else setMessage(err.response.data.error.message || "Error");

        setAppClass("error");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  return { loading, products, error, message, appClass };
}
