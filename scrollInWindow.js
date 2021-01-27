(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory();
    else if (typeof define === "function" && define.amd) define([], factory());
    else if (typeof exports === "object") exports["scrollInWindow"] = factory();
    else root["scrollInWindow"] = factory();
})(this, function () {
    let doms;

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (rect.top <= 0 && rect.bottom >= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    };

    const scrollHandler = () => {
        for (let i = 0; i < doms.length; i++) {
            const dom = doms[i];
            if (isElementInViewport(dom)) {
                dom.classList.add(dom.getAttribute("scroll-ani-class"));
                doms.splice(i, 1);
                i--;
            }
        }
    };

    const init = () => {
        doms = [...document.querySelectorAll("[scroll-ani-class]")];
        window.addEventListener("scroll", scrollHandler);
    };

    const refresh = () => {
        doms = [...document.querySelectorAll("[scroll-ani-class]")];
    };

    const remove = () => {
        window.removeEventListener("scroll", scrollHandler);
    };

    return {
        init,
        refresh,
        remove,
    };
});
