# Classes

Here's all the classes available to style your dialog

- ```.s-dialog``` : The main container of the dialog
- ```.s-dialog--{type}``` : Applied on the main container to style your dialog differently depending on the type specified
- ```.s-dialog__overlay``` : The overlay between the website and the actual dialog content
- ```.s-dialog__content``` : The overlay content
- ```.s-dialog__close``` : The element that act as a close button

## Simple styling example

Here's a simple styling example

```scss
.s-dialog {
}
.s-dialog__overlay {
	background: rgba(0,0,0,.8);
}
.s-dialog__content {
	background: white;
	padding: 10px;
	max-width: 800px;
}
```
