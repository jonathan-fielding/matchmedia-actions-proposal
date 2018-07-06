const mql = window.matchMedia('(max-width: 600px)');
mql.addListener(() => console.log('resize'), 'resize');
mql.addListener(() => console.log('enter'), 'enter', true);
mql.addListener(() => console.log('leave'), 'leave');
