export default function getPageWindow(currentPage = 1, totalPages = 10, window = 5) {
    const half = Math.floor(window / 2);
    let start = currentPage - half;
    let end = currentPage + half;
    if (start < 1) {
        start = 1;
        end = window;
    };
    if (end > totalPages) {
        end = totalPages;
        start = totalPages - window + 1;
        if (start < 1) start = 1;
    };
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
};