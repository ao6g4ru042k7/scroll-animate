(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory();
    else if (typeof define === "function" && define.amd) define([], factory());
    else if (typeof exports === "object") exports["scrollCustomEvent"] = factory();
    else root["scrollCustomEvent"] = factory();
})(this, function () {
    let events = [];

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (rect.top <= 0 && rect.bottom >= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    };

    const scrollHandler = () => {
        for (let i = 0; i < events.length; i++) {
            const dom = events[i].ref;
            if (isElementInViewport(dom)) {
                events[i].callback()
                events.splice(i, 1);
                i--;
            }
        }
    };

    const init = () => {
        window.addEventListener("scroll", scrollHandler);
    };

    const add = (ref, callback) => {
        events.push({ ref, callback });
    };

    const remove = () => {
        window.removeEventListener("scroll", scrollHandler);
    };

    return {
        init,
        add,
        remove,
    };
});
