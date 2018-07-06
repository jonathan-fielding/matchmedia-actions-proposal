# matchMedia Actions Proposal

The matchMedia API allows us to add listeners that when the media query is matched or unmatched it will fire a method. A common pattern for using this would look like the following.

``` javascript
const mql = window.matchMedia('(max-width: 600px)');
const enter = () => console.log('enter');
const leave = () => console.log('leave');

if (mql.matches) {
    enter();
}

mql.addListener((event) => {
    if (event.matches) {
        enter();
    } else {
        leave();
    }
});
```

This allows developers to target JavaScript towards different breakpoints so that they can target functioanlity based on the type of display.

The limitation of using matchMedia to add listeners is that you are very restricted to what you can do. The `addListener` method only takes a single parameter which is the listener you are adding. It then passes a event object into the listener with a parameter called `matches` which has a value of `true` or `false`. 

For consistency with other API's what I would have prefered to have seen would have been something more along the lines of addEventListener where you can specify the event to attach a listener to. This would help with the readability of the codebase and also provide for future expandability of the options. An example of how this could have been implemented:

``` javascript
mql.addListener('enter', enter);
mql.addListener('leave', enter);
```

In addition to the enter and leave events that `addListener` currently supports through `event.matches` I would also have liked to have a individual resize event targeted at a media query.

To achieve this in June 2013 I released SimpleStateManager, a JavaScript library that added the ability to have named enter, leave and resize events. 5 Years later I wanted to revisit how this could be done in a standards way hence this proposal.

The matchMedia API is specified in https://github.com/w3c/csswg-drafts/issues. The first part of the proposal is to add a second parameter to the API which will be the action type.

``` javascript
mql.addListener(enter, 'enter');
```

The actions supported would be:

* `enter` - A listener set to the `enter` action would execute 
* `leave` - A listener set to the `leave` action would execute when 'matches' goes from true to false; 
* `resize` - This is new behaviour, a resize listener would execute whenever the browser is resized while the media query matches.

An example of how this would work is as follows

``` javascript
const mql = window.matchMedia('(max-width: 600px)');
mql.addListener((event) => console.log('resize'), 'resize');
mql.addListener((event) => console.log('enter'), 'enter');
mql.addListener((event) => console.log('leave'), 'leave');
```





