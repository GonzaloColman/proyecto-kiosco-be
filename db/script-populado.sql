insert into roles (codigo, nombre) value ('ADM','Administrador');
insert into roles (codigo, nombre) value ('URS','Usuario');
insert into usuario (email, password, activo, rolID) values ('admin@kiosco.com', '123456', 1,1);

select * from roles;
select * from Usuario;