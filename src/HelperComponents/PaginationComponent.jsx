import { Pagination } from "react-bootstrap";
import { useState } from "react";

const PaginationComponent = (props) => {
    const {onPageChange, lastPage, totalItems, itemsPerPage} = props;
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (page) => {
        console.log('page changed', page)
        onPageChange;
        setActivePage(page);
        onPageChange(page);
    }
    
    const renderPages = () =>  {
        if (lastPage <= 5) {
        return renderBasicPagination(lastPage);
        }
        return renderAdvancedPagination(lastPage);
    }

    const renderBasicPagination = (lastPage) => {
        let pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(renderPaginationItem(i, i === activePage));
        }
        return pages;
    }
    const renderAdvancedPagination = (lastPage) => {
        const middlePage = calculateMidPage(lastPage);
        const preMiddlePage = middlePage - 1;
        const postMiddlePage = middlePage + 1;
        return (
            <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)}/>
            <Pagination.Prev
                onClick={() => handlePageChange(activePage - 1 <= 1 ? 1 : activePage - 1)}/>
            <Pagination.Ellipsis disabled/>
      
            {renderPaginationItem(preMiddlePage, preMiddlePage === activePage)}
            {renderPaginationItem(middlePage, middlePage === activePage)}
            {renderPaginationItem(postMiddlePage, postMiddlePage === activePage)}
      
            <Pagination.Ellipsis disabled />
            <Pagination.Next 
                onClick={() => handlePageChange(activePage + 1 > lastPage ? lastPage : activePage + 1)}/>
            <Pagination.Last onClick={() => handlePageChange(lastPage)}/>
          </Pagination>
        )
    }
    const renderPaginationItem = (page, isActive) => {
        return (
            <Pagination.Item key={page} active={isActive} onClick={() => handlePageChange(page)}>
                {page}
            </Pagination.Item>
        );
    }
        // Helper Functions
        const calculatePages = (totalItems, itemsPerPage) => {
            if (totalItems === 0) {
                return 0;
            }
            const pages = Math.floor(totalItems / itemsPerPage) +1;
            console.log('pages:', pages);
            return pages;
        }
        const calculateMidPage = (lastPage) => {
            if (activePage === 1 || activePage === lastPage) {
                return Math.floor(lastPage / 2);
            }
            return activePage;
        }

        return(
            <div>
                <Pagination>{renderPages()}</Pagination>
            </div>
        );        
}
export default PaginationComponent;