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
        const { totalItems, itemsPerPage } = this.props;
        const numberOfPages = this.calculatePages(totalItems, itemsPerPage);
        if (numberOfPages <= 5) {
        return this.renderBasicPagination(numberOfPages);
        }
        return this.renderAdvancedPagination(numberOfPages);
    }

    renderBasicPagination(numberOfPages) {
        let pages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(this.renderPaginationItem(i, i === this.state.activePage));
        }
        return pages;
    }

    renderAdvancedPagination(numberOfPages) {
        const middlePage = this.calculateMidPage(numberOfPages);
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
                onClick={() => this.handlePageChange(activePage + 1 > numberOfPages ? numberOfPages : activePage + 1)}/>
            <Pagination.Last onClick={() => this.handlePageChange(numberOfPages)}/>
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

    calculateMidPage(numberOfPages) {
        if (this.state.activePage === 1 || this.state.activePage === numberOfPages) {
            return Math.floor(numberOfPages / 2);
        }
        return this.state.activePage;
    }

}

export default PaginationComponent;