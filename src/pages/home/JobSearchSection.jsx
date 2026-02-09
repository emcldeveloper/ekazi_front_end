import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";

import SearchModalForm from "./components/SearchModalForm";
import useJob from "../../hooks/useJob";
import { useIndustry } from "../../hooks/useUniversal";

const JobSearchSection = () => {
  const {
    jobs,
    loading,
    loadMore,
    hasMore,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    loadingMore,
  } = useJob();

  const { data: industries } = useIndustry();

  const [showModal, setShowModal] = useState(false);
  const modalBodyRef = useRef(null);

  /**
   * 🔥 Instead of filtering again, we use the ALREADY FILTERED jobs from useJob()
   * When Search is clicked → open modal and show the filtered jobs
   */
  const handleSearch = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  /**
   * 🔥 Infinite Scroll inside modal
   */
  const handleScroll = () => {
    const el = modalBodyRef.current;
    if (!el || loadingMore || !hasMore) return;

    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 50;

    if (bottomReached) {
      loadMore();
    }
  };

  /**
   * 🔥 Debounced search (300ms)
   */
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);

    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <Container className="">
      <div className="search-container">
        <style>{`
          .customForm {
            border: 1px solid #D7D8DA50;
          }
          .customForm:focus {
            border: 2px solid #2E58A6;
          }
        `}</style>

        <div className="row">
          <div className="col-md-12">
            <div className="row d-flex align-items-center justify-content-between">
              {/* Search Input */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control rounded customForm"
                  placeholder="What are you looking for..."
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
              </div>

              {/* Industry Dropdown */}
              <div className="col-md-4">
                <select
                  className="form-select"
                  style={{ background: "rgba(255, 255, 255, 0.9)" }}
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="">Select Category</option>

                  {industries?.length > 0 &&
                    industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.industry_name}
                      </option>
                    ))}

                  {!industries && <option>Loading industries...</option>}
                </select>
              </div>

              {/* Search Button */}
              <div className="col-md-2">
                <button
                  className="btn btn-warning text-white"
                  style={{
                    border: "none",
                    backgroundColor: "#D36314",
                    width: "100%",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Modal showing already-filtered jobs */}
      <SearchModalForm
        showModal={showModal}
        handleClose={handleClose}
        modalBodyRef={modalBodyRef}
        handleScroll={handleScroll}
        filteredJobs={jobs} // Jobs are ALREADY filtered by useJob hook
        loadingMore={loadingMore}
        hasMore={hasMore}
        loading={loading}
      />
    </Container>
  );
};

export default JobSearchSection;
