1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: getElementById = return 1 element with that ID, getElementsByClassName = returns many elements, querySelector = returns 1st match using CSS elector, querySelectorAll = returns all CSS matches.

2.How do you create and insert a new element into the DOM?
Ans:steps to create and insert a new element into the DOM
    create element
    set attribute
    insert into DOM
    ex:  cont boom = document.createElement('boom');
         boom.textcontent = 'Hi Rayhan Khan';
         document.body.appendChild(boom);

3.What is Event Bubbling and how does it work?
Ans: Event Bubbling is a type of DOM event propagation where event starts form the child element.
     press a <button> inside a <div> fristly press the a button and than the div click handler
     we can stop upper propagation  to this = event.stopPropagation().

4.What is Event Delegation in JavaScript? Why is it useful?
Ans:Event delegation is a powerful pattern in JavaScript also improve performance and maintainability of your code ect.
its very usefull because
    save memory.
    work dynamically also added elements .
    make code clen and easier.

5.What is the difference between preventDefault() and stopPropagation() methods?
Ans:preventDefault() is a stops default behavior og the element
    stopPropagation() is a stops the event from moving up the DOM tree
