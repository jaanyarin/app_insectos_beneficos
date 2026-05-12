-- V2__fix_priv_columns.sql
-- Ensure privilege columns in usuarios use SMALLINT to match Hibernate entity mapping.

ALTER TABLE usuarios MODIFY COLUMN priv_insectos_beneficos SMALLINT DEFAULT 0;
ALTER TABLE usuarios MODIFY COLUMN priv_evaluacion_nematodos SMALLINT DEFAULT 0;
