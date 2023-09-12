import { Component } from "react";
import { Pagination } from "react-bootstrap";

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
        }
    }

    handlePageChange(page) {
        console.log('page changed', page)
        const { onPageChange } = this.props;
        this.setState({activePage: page});
        onPageChange(page);
    }

    render() {
        return(
            <div>
                <Pagination>{this.renderPages()}</Pagination>
            </div>
        );
    }

    renderPages() {
        const { totalItems, itemsPerPage, lastPage } = this.props;
        if (lastPage <= 5) {
        return this.renderBasicPagination(lastPage);
        }
        return this.renderAdvancedPagination(lastPage);
    }

    renderBasicPagination(lastPage) {
        let pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(this.renderPaginationItem(i, i === this.state.activePage));
        }
        return pages;
    }

    renderAdvancedPagination(lastPage) {
        const middlePage = this.calculateMidPage(lastPage);
        const preMiddlePage = middlePage - 1;
        const postMiddlePage = middlePage + 1;
        const { activePage } = this.state;
        return (
            <Pagination>
            <Pagination.First onClick={() => this.handlePageChange(1)}/>
            <Pagination.Prev
                onClick={() => this.handlePageChange(activePage - 1 <= 1 ? 1 : activePage - 1)}/>
            <Pagination.Ellipsis disabled/>
      
            {this.renderPaginationItem(preMiddlePage, preMiddlePage === activePage)}
            {this.renderPaginationItem(middlePage, middlePage === activePage)}
            {this.renderPaginationItem(postMiddlePage, postMiddlePage === activePage)}
      
            <Pagination.Ellipsis disabled />
            <Pagination.Next 
                onClick={() => this.handlePageChange(activePage + 1 > lastPage ? lastPage : activePage + 1)}/>
            <Pagination.Last onClick={() => this.handlePageChange(lastPage)}/>
          </Pagination>
        )
    }

    renderPaginationItem(page, isActive) {
        return (
            <Pagination.Item key={page} active={isActive} onClick={() => this.handlePageChange(page)}>
                {page}
            </Pagination.Item>
        );
    }

    // Helper Functions
    calculatePages(totalItems, itemsPerPage) {
        if (totalItems === 0) {
            return 0;
        }
        const pages = Math.floor(totalItems / itemsPerPage) +1;
        console.log('pages:', pages);
        return pages;
    }

    calculateMidPage(lastPage) {
        if (this.state.activePage === 1 || this.state.activePage === lastPage) {
            return Math.floor(lastPage / 2);
        }
        return this.state.activePage;
    }

}

export default PaginationComponent;