# 🌐 intentx-runtime

[![NPM](https://img.shields.io/npm/v/intentx-runtime.svg)](https://www.npmjs.com/package/intentx-runtime) ![Downloads](https://img.shields.io/npm/dt/intentx-runtime.svg)

<a href="https://codesandbox.io/p/devbox/rq72pf" target="_blank">LIVE EXAMPLE</a>

 A small, framework-agnostic runtime for structuring domain logic.  

> Encourages isolated modules and communication through a shared intent bus.

---

## ✨ Why intentx-runtime?

- 🧠 Modular business logic
- 📦 Independent state per logic
- 🔄 Event-driven communication
- 🧩 Shared intent bus
- ⚡ Computed with shallow caching
- 🛠 Works in Node, React, Vue, or anywhere

This is **not a UI state library**.  
This is a **logic runtime engine**.

---

## 📦 Installation

```bash
npm install intentx-runtime
```

---

## 🧠 Mental Model

```
UI / HTTP / Queue / Cron
        ↓
     emit(intent)
        ↓
   effects / middleware
        ↓
   intent handlers
        ↓
     mutate state
        ↓
computed (derived state) / subscribers
```
---

## 🧩 Single Logic Example

#### userLogic.ts

```ts
import { createLogic } from "intentx-runtime"

export const userLogic = createLogic({
  name: "user",

  state: {
    user: null as null | { name: string },
  },

  computed: {
    isLoggedIn: ({ state }) => !!state.user,
  },

  intents: bus => {
    bus.on<string>("login", ({ payload, setState }) => {
      setState(s => {
        s.user = { name: payload }
      })
    })

    bus.on("logout", ({ setState }) => {
      setState(s => {
        s.user = null
      })
    })
  },

  actions: {
    login({ emit }) {
      return (name: string) => emit("login", name)
    },

    logout({ emit }) {
      return () => emit("logout")
    },
  },
})
```

---

## 🧩 Multi-Logic Example (Shared Bus)

#### cartLogic.ts

```ts
import { createLogic } from "intentx-runtime"

export const cartLogic = createLogic({
  name: "cart",

  state: {
    items: [] as string[],
  },

  computed: {
    total: ({ state }) => state.items.length,
  },

  intents: bus => {
    bus.on<string>("add-item", ({ payload, setState }) => {
      setState(s => {
        s.items.push(payload)
      })
    })

    bus.on("clear-cart", ({ setState }) => {
      setState(s => {
        s.items = []
      })
    })
  },

  actions: {
    addItem({ emit }) {
      return (item: string) => emit("add-item", item)
    },

    clear({ emit }) {
      return () => emit("clear-cart")
    },
  },
})
```

---

## 🚀 Create App

```ts
import { createApp } from "intentx-runtime"
import { userLogic } from "./userLogic"
import { cartLogic } from "./cartLogic"

const app = createApp({
  logics: {
    user: userLogic,
    cart: cartLogic,
  },
})
```

---

## ▶ Run

```ts
const run = async () => {
  await app.logics.user.actions.login("An")

  await app.logics.cart.actions.addItem("iPhone")
  await app.logics.cart.actions.addItem("Macbook")

  console.log(app.logics.cart.state.total)
  // 👉 2
}

run()
```

---

## 🧠 How Computed Works

Computed values:

- Recalculate only when state changes (shallow)
- Cached between reads
- Lazy evaluation

Example:

```ts
computed: {
  total: ({ state }) => state.items.length
}
```

It only recalculates when `items` reference changes.

---

## 🧩 Logic Isolation

Each logic:

- Has its own state
- Has its own computed
- Has its own actions
- Communicates only via intent bus

No direct cross-logic mutation.

---

## 🏗 Architecture

```
createApp()
   │
   ├── shared IntentBus
   │
   ├── userLogic runtime
   │       ├ state
   │       ├ computed
   │       └ actions
   │
   └── cartLogic runtime
           ├ state
           ├ computed
           └ actions
```

---

## 🛠 Works Anywhere

Because this runtime:

- Has no framework dependency
- No React hooks
- No Vue reactivity
- Pure TypeScript

You can:

- Use in Node backend
- Wrap into React hook
- Wrap into Vue composable
- Run in service workers

---

## 🔍 Comparison With Other Libraries

| Criteria                | 🚀 intentx-runtime       | 🧰 Redux Toolkit  | 🐻 Zustand      | ⚡ MobX           | 🎛️ XState        |
| ----------------------- | ----------------------- | ----------------  | --------------- | ---------------- | ---------------- |
| **Event-driven Core**   | ✅ Native                | ⚠️ Action-based   | ❌              | ❌               | ✅ FSM            |
| **Modular Isolation**   | ✅ True domain isolation | ⚠️ Slice-based    | ⚠️ Store-based  | ❌ Shared graph  | ⚠️ Machine-based  |
| **Shared Event Bus**    | ✅ Built-in              | ❌                | ❌              | ❌               | ⚠️ Actor model    |
| **Built-in Computed**   | ✅ First-class           | ❌                | ❌              | ✅               | ❌                |
| **Framework Agnostic**  | ✅ 100%                  | ⚠️ React-first    | ⚠️ React-first  | ⚠️ Mostly React  | ✅ 100%           |
| **Backend Friendly**    | ✅ Designed for it       | ❌                | ❌              | ❌               | ⚠️ Possible       |
| **Domain-first Design** | ✅ Core philosophy       | ❌                | ❌              | ❌               | ⚠️ Machine-first  |

---

<b>Legend</b>

- `Event-driven Core`: Has a first-class event system for orchestration.

- `Modular Isolation`: Encourages splitting logic into isolated modules.

- `Shared Event Bus`: Supports communication between modules via central bus.

- `Built-in Computed`: Provides derived state with caching.

- `Framework Agnostic`: Not tightly coupled to React or any UI framework.

- `Backend Friendly`: Can run naturally in Node or server environments.

- `Domain-first Design`: Designed primarily for business logic, not UI state.

---

#### 🧠 Positioning Summary

- **Redux Toolkit** → predictable UI state for React apps  
- **Zustand** → tiny and ergonomic React store  
- **MobX** → automatic reactivity system  
- **XState** → explicit state machine modeling  
- **intentx-runtime** → modular event-driven domain logic runtime  

---

#### 🎯 What Makes intentx-runtime Different?

- Redux for domain
- XState without machine rigidity
- Event bus with isolated state containers
- Backend-style architecture usable on frontend

---

## 🔥 Philosophy

**intentx-runtime** is built for:

- Complex domain logic
- Backend-like state flow
- Deterministic event system
- Scalable modular architecture

It is not meant to replace Redux or Zustand.  
It is meant to replace messy business logic.

---

## 📜 License

MIT