## Adapter

#### Definition

The adapter pattern convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn’t otherwise because of incompatible interfaces.

To use an adapter:

- The client makes a request to the adapter by calling a method on it using the target interface.
- The adapter translates that request on the adaptee using the adaptee interface.
- Client receive the results of the call and is unaware of adapter’s presence.

Advantages:

- Helps achieve reusability and flexibility.
- Client class is not complicated by having to use a different interface and can use polymorphism to swap between different implementations of adapters.

Disadvantages:

- All requests are forwarded, so there is a slight increase in the overhead.
- Sometimes many adaptations are required along an adapter chain to reach the type which is required.
