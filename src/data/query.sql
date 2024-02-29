SELECT TOP 10 Codigo, Nombre, Apellido1, Telefono, Activo FROM [dbo].[Cliente] WHERE Activo = 1

SELECT * 
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME

SELECT Codigo, Nombre, Apellido1, Telefono, Activo FROM [dbo].[PedidoWebVentaDirecta] p INNER JOIN [dbo].[Cliente] c ON p.CodCliente = c.Codigo

SELECT TOP 10
	p.Codigo CodigoPedido, 
	c.Codigo CodigoCliente,
	Nombre NombreCliente, 
	Apellido1 ApellidoCliente, 
	Telefono TelefonoCliente, 
	Activo esActivo, 
	p.Cantidad CantidadPedido
FROM [dbo].[ultimopedido] p INNER JOIN [dbo].[Cliente] c 
ON p.usuario = c.Codigo WHERE Activo = 1;


SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS

SELECT COUNT(0)
FROM [dbo].[ultimopedido] p INNER JOIN [dbo].[Cliente] c 
ON p.usuario = c.Codigo
--> 3204

SELECT * FROM [dbo].logIvaPedidosWebTemp
-- 2789

SELECT * FROM [dbo].PedidoWebVentaDirecta
--> 2

SELECT * FROM [dbo].pedidoWebTmp
--> 0

SELECT * FROM [dbo].ultimopedido 
--> 4529

SELECT * FROM [dbo].[V_ConsolidadoPedidoPreventaD]
--> 0