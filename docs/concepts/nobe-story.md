# Nobe Story

In this section, we aim to define what a Nobe Story is? Which is an integral part of the NobeJS Framework.

A Product Owner/Client usually gives you requirements in verbal or written format; If they are following Agile, they might use the word "Story" too. A Project Manager or a Lead might even assign you the task of a Story or collection of Stories. Then, as you start implementing, you might break them down into some MVC patterns or FaaS patterns. MVC being the most popular one, you write a route and a controller. The controller contains few methods. At this point, "controller" is the concept you are using to abstract, but the story is one of the controller methods.

Nobe Story goes away from that direction of a controller and goes into a "One Story - One Endpoint - One File" format. But, even if that file, it's not one function responsible for the entire implementation, but multiple functions (which we also refer to as phases), which get called in a series. 

NobeJS, by default, comes with a predefined set of phases called "Strategies," you can change them in one place, and it is applied globally to the entire codebase. 

Two of those strategies are:

- endpointStrategy
- testStrategy

You can learn more about them in "Nobe Strategy" documentation. But, at this point, we can define it as: "Nobe Story" is a representation of a Business Story in code, and the implementation is in various phases. 

