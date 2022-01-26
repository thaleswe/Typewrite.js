document.body.onload = () => {
  const typewrite_style = document.createElement("style");
  const typewrite_rules = `
  /* Style injected by typewrite.js */
  
  :root {
    --bg-color: #1d1e22;
    --typewriterSpeed: 1.5s;
    --typewriterCharacters: 22;
    --waitToStart: 0.3s;
  }
  
  
  .write {
    position: relative;
    width: max-content;
  }
  
  .write::before,
  .write::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .write::before {
    background: var(--bg-color);
    animation: typewriter var(--typewriterSpeed)
      steps(var(--typewriterCharacters)) var(--waitToStart) forwards;
  }
  
  .write::after {
    width: 0.125em;
    background: #fff;
    animation: typewriter var(--typewriterSpeed)
        steps(var(--typewriterCharacters)) var(--waitToStart) forwards,
      blink 750ms steps(var(--typewriterCharacters)) infinite;
  }
  
  step {
    display: none;
  }

  .active {
    display: initial;
  }
  
  @keyframes typewriter {
    to {
      left: 100%;
    }
  }
  
  @keyframes blink {
    to {
      background: transparent;
    }
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
    }
  }`;

  typewrite_style.type = "text/css";
  typewrite_style.innerHTML = typewrite_rules;

  document.getElementsByTagName("head")[0].appendChild(typewrite_style);
};

const type = {
  write: (reference, typeConfig) => {
    const isNodeList = NodeList.prototype.isPrototypeOf(reference);
    const isElement = reference instanceof HTMLElement;
    let target;

    if (isNodeList === true) {
      target = reference;
    } else if (isElement === true) {
      target = [reference];
    } else {
      target = document.querySelectorAll(reference);
    }

    target.forEach((target) => {
      if (typeConfig) {
        const allDetails = Object.entries(typeConfig);

        allDetails.forEach((details) => {
          switch (details[0]) {
            case "preReveal":
              target.style.setProperty("--bg-color", details[1]);
              break;

            case "typeSpeed":
              target.style.setProperty("--typewriterSpeed", details[1]);
              break;

            case "frame":
              target.style.setProperty("--typewriterCharacters", details[1]);
              break;

            case "waitToStart":
              target.style.setProperty("--waitToStart", details[1]);
              break;
          }
        });
      }

      target.classList.add("write");
    });
  },

  stepWrite: (parent, stepWrite, writeConfig) => {
    const parentReference =
      parent instanceof HTMLElement ? parent : document.querySelector(parent);
    const stepWriteReference =
      stepWrite instanceof HTMLElement ? stepWrite.innerHTML : stepWrite;

    parentReference.innerHTML = stepWriteReference;

    const allReferences = Object.entries(writeConfig);
    allReferences.forEach((reference) => {
      const tabIndexReference = reference[0];
      const arrayConfig = reference[1];

      const object_write_config = Object.entries(arrayConfig[0]);
      const timeout_config = arrayConfig[1];

      const elementMatched = document.querySelector(
        `step[tabindex="${tabIndexReference}"]`
      );

      const lastElementMatched = document.querySelector(
        `step[tabindex="${tabIndexReference - 1}"]`
      );

      setTimeout(() => {
        object_write_config.forEach((details) => {
          switch (details[0]) {
            case "preReveal":
              elementMatched.style.setProperty("--bg-color", details[1]);
              break;

            case "typeSpeed":
              elementMatched.style.setProperty("--typewriterSpeed", details[1]);
              break;

            case "frame":
              elementMatched.style.setProperty(
                "--typewriterCharacters",
                details[1]
              );
              break;

            case "waitToStart":
              elementMatched.style.setProperty("--waitToStart", details[1]);
              break;
          }
        });

        if (lastElementMatched) {
          lastElementMatched.classList.remove("write");
        }

        elementMatched.classList.add("write");
        elementMatched.classList.add("active");
      }, timeout_config);
    });
  },
};