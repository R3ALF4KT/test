function delay(ms) {
    return new Promise( x => setTimeout(x, ms) );
}

async function change( element ) {

    let elementSplitted = element.innerHTML.split('/');

    if(elementSplitted.length == 1) return;

    let start = 0;
    let end = elementSplitted[0].split('[')[1];
    let type = elementSplitted[1].split(']')[0];

    element.innerHTML = "[" + start + type + "]";

    for(let i = 1; i <= end; ++i) {
        await delay(2000 / end);
        element.innerHTML = "[" + i + type + "]";
    }

}

async function anim() {

    let elements = document.getElementsByTagName('a');

    for(let i = 0; i < elements.length; ++i) {
        if(elements[i].getAttribute('change')) {
            change( elements[i] );
        }
    }

}

async function animate(element) {
    let current = parseInt(getComputedStyle(element).width);
    let max = window.innerWidth;

    while(current > 0) {
        max = window.innerWidth;
        current -= 2;
        element.style.width = current+"px";
        await delay(1)
    }

    element.style.visibility = "hidden";

    await delay(500);

    element.style.visibility = "visible";

    while(current < max) {
        max = window.innerWidth;
        current += 2;
        element.style.width = current+"px";
        await delay(1)
    }

    await delay(500);

    animate(element);

}

anim();
animate(document.getElementById('animator'));