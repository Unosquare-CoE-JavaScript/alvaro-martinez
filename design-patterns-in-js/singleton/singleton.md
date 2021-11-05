## singleton

This pattern involves a single class which is responsible to create an object while making sure that only single object gets created. This class provides a way to access its only object which can be accessed directly without need to instantiate the object of the class.

There are two forms of singleton design pattern

- Early Instantiation: creation of instance at load time
- Lazy Instantiation: creation of instance when required.

### Advantage

Saves memory because object is not created at each request. Only single instance is reused again and again.

### Usage

Singleton pattern is mostly used in multi-threaded and database applications. It is used in logging, caching, thread pools, configuration settings etc.
