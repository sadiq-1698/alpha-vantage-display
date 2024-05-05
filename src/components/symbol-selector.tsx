import Modal from "./modal";
import axios from "../api/axios";
import useModal from "../utils/hooks/useModal";
import { useDebounce } from "../utils/hooks/useDebounce";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ReactComponent as SearchSvg } from '../utils/assets/search.svg';
import { StockContext, StockDispatchContext } from "../utils/contexts/StockContext";

const SymbolSelector = () => {
  const { toggleModal, closeModal, isOpen } = useModal();
  const { dataQuery } = useContext(StockContext);
  const { setDataQuery } = useContext(StockDispatchContext);

  const [searchVal, setSearchVal] = useState('');
  const [fetching, setFetching] = useState(false);
  const [searchResults, setSearchResults] = useState<Record<string, string>[]>([]);

  const searchQuery = useDebounce(searchVal, 1500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  }

  const handleCloseModal = () => {
    closeModal();
    setSearchVal("");
    setSearchResults([]);
  }

  const handleSymbolSelect = (symbol: string) => {
    setDataQuery(prev => ({
      ...prev,
      symbol: symbol
    }))
    handleCloseModal();
  }

  useEffect(() => {
    if (searchQuery || searchQuery.length < 0) searchCharacter();
    async function searchCharacter() {
      setFetching(true);
      const response = await axios.get(`?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${process.env.REACT_APP_API_KEY}`)
      // const response = await axios.get("?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo");
      
      setFetching(false);
      
      if (response.data && response.data.bestMatches) {
        setSearchResults([...response.data.bestMatches])
      }
    }
  }, [searchQuery])

  return (
    <>
      <div onClick={toggleModal} className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 pr-3">
        <span className="font-bold text-sm py-2">
          {dataQuery.symbol}
        </span>
        <SearchSvg />
      </div>

      {
        isOpen && (
          <Modal closeModal={handleCloseModal}>
            <div className="h-[500px] overflow-y-hidden">
              <input
                onChange={handleSearch}
                placeholder="Search for symbol"
                className="w-full outline-transparent focus:outline-1 focus:outline-black focus:border-none border border-solid border-gray-400 rounded-md p-2"
              />

              {
                searchQuery.length > 0 && searchVal.length > 0 &&
                <div className="flex justify-center items-center">
                  {
                    !fetching && searchResults.length < 1 &&
                    <span>No matches found!</span>
                  }
                  {
                    fetching &&
                    <span>Fetching...</span>
                  }
                </div>

              }

              {
                !fetching && searchResults.length > 0 &&
                <div className="flex flex-1 h-full overflow-y-auto flex-col justify-start items-start py-4">
                  {
                    searchResults.map(symbol => {
                      return (
                        <div
                          key={symbol["1. symbol"]}
                          onClick={() => handleSymbolSelect(symbol["1. symbol"])}
                          className="py-2 px-1 w-full border-b border-solid border-gray-200 flex justify-between items-center bg-white hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex flex-col items-start flex-1">
                            <p>
                              {symbol["2. name"]}
                            </p>
                            <p className="text-sm text-gray-500">
                              {symbol["1. symbol"]}
                            </p>
                          </div>

                          <div className="flex flex-col items-end flex-1">
                            <p>{symbol["4. region"]}</p>
                            <p className="text-sm text-gray-500">
                              {symbol["3. type"]}
                            </p>
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>
          </Modal>
        )
      }
    </>
  );
};

export default SymbolSelector;
