(()=> {
    MediaQueryList.prototype.originalAddListener = MediaQueryList.prototype.addListener;

    MediaQueryList.prototype.addListener = function(func, action, runIfMatch) {
        const listener = (event) => {
            const matches = event.matches;

            if (matches && action === 'enter') {
                func(event);
            } else if (!matches && action === 'leave') {
                func(event);
            } else if (matches && action === 'resize') {
                window.addEventListener('resize', func);
            } else if (!matches && action === 'resize') {
                window.removeEventListener('resize', func);
            }
        };

        if (runIfMatch && this.matches) {
            func(this);
        }

        this.originalAddListener(listener);
    }
})();