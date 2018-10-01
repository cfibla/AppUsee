
Beta 1.0.3
Afegir valoració EE:
	1. Modificar eeusee boolean a string en DB
		db.Alumnes.update({eeUsee: true}, {$set: {eeUsee: "true"}}, {multi:true});
		db.Alumnes.update({eeUsee: false}, {$set: {eeUsee: "false"}}, {multi:true});

	2. Modificar eeUsee boolean a string en modelo
	3. Modificar eeUsee boolean a string en index.ejs
	4. Añadir en global.js el "Valorat"
	5. Añadir en dades.js el "Valorat"
	6. Añadir en nouAlumne.js el "Valorat"
	7. Afegir buscar alumnes???
	modal dades: at. diversitat no carrega el Valorat
Afegir "last login" users
quan els alumnes acaben 6e, passen a ser "ex-alumnes"
Bootstrap 4 + mdb4.5
??Button 'Elimina horari' i horari auto-eliminat en 15 dies
Protecció de dades
Perfil usuari -> Escola (crear nova si canvia) - Els meus companys
Àrees - Diari - Configuració

BETA 1.0.2
+Secció al Home "Com funciona?"
+Uppercase modificació dades
+Horari-config: Afegir boton "borrar horari" 
+Quan es crea un horari no funciona apartat "ÀREES" (1st call)
+Registre "mestre -ee -escola"


BETA 1.0.1
+Crear usuari ADMIN - botó canvi de curs
+Open Graph Facebook
+Fer apartat "Entra"
+Fer que el nom de l'alumne sigui link


BETA 1.0.0
+Button 'desa horari' treure avis de canvis
+ARREGLAR 'desa horari' en horari-arees
+Etiquetes actives - LABELS
+Curs i Tots els alumnes en NAV-collapse en la pantalla petita
+Avís de guardar canvis
+A Horaris i seguiment: Un botó general "Desa els canvis" a l'aside
+Comunicar errors SIGN UP
+Enviar mail a l'admin
+Juntar "Mestres - EE"
+Dades personals alumnes: Canviar "codi escola" pel nom de l'escola
+Treure 'escola' de tots els usuaris-alumnes (DB)
+Apartat reunions i reunions seguiment: títol i apartats a l'aside