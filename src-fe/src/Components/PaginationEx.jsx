import { Pagination } from "react-bootstrap";

const PaginationEx = ({ pageable, goPage }) => {
  return (
    <>
      <Pagination className="mx-auto mt-4 justify-content-center">
        {pageable.first ? (
          <>
            <Pagination.First disabled />
            <Pagination.Prev disabled />
          </>
        ) : (
          <>
            <Pagination.First onClick={() => goPage(0)} />
            <Pagination.Prev onClick={() => goPage(pageable.number - 1)} />
          </>
        )}
        <Pagination.Item disabled>{pageable.number + 1}</Pagination.Item>
        {pageable.last ? (
          <>
            <Pagination.Next disabled />
            <Pagination.Last disabled />
          </>
        ) : (
          <>
            <Pagination.Next onClick={() => goPage(pageable.number + 1)} />
            <Pagination.Last onClick={() => goPage(pageable.totalPages - 1)} />
          </>
        )}
      </Pagination>
    </>
  );
};
export default PaginationEx;
