--  Lembrar de deletar para enviar o projeto

-- selecionar todos os filmes
SELECT * FROM movies;

-- criar filmes

INSERT INTO
	movies ("name", "category", "duration", "price")
VALUES
	('M3GAN', 'Terror', 102, 30.00)	

RETURNING *;

-- Listagem de um movie filtrando pelo id
SELECT * FROM movies WHERE id = 1

RETURNING *;

-- deleção de filme atraves do id

DELETE FROM
movies
WHERE
id = 1;
RETURNING id, "type";


-- procurar por filme especifico usando o name

SELECT name FROM movies WHERE name = 'M3GAN';



-- update movies

UPDATE 
 movies
SET(price) = ROW (50)  
WHERE
 id = 1
 RETURNING *;