import { Response } from "express";

export const errorHandler = (
  error: unknown,
  res: Response,
  localError: string
) => {
  if (error instanceof Error) {
    res.status(404).json({ where: localError, error: error.message });
  } else {
    res.status(500).json({ error: "Erro desconhecido" });
  }
};

export const errorMessages = (path: string, error: any): string => {
  return `Erro ao consultar ${path} : {status: ${error.response.status}, data: ${error.response.data}}`;
};
