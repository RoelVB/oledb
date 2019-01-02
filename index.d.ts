declare namespace oledb 
{
    export interface JsCommand<T>
    {
        /** The query string */
        query: string;
        /** The query type, use one of the oledb.COMMAND_TYPES enumerations. Defaults to 'command' */
        type?: oledb.COMMAND_TYPES;
        /** The query parameters */
        params?: JsCommandParameter[];
        result?: T[][];
    }

    export interface JsCommandParameter
    {
        /** Parameter name. Defaults to index based parameter names, i.e @p1, @p2, @p3 ect. Note that the @ symbols are optional */
        name?: string;
        /** Defaults to null */
        value?: string;
        /** The parameter direction, (Input, Input/Output, Output, Return Value). See oledb.PARAMETER_DIRECTIONS enum */
        direction?: oledb.PARAMETER_DIRECTIONS;
        /** Whether to treat the paramter as non-nullable */
        isNullable?: boolean;
        /** The precision of the parameter value in bytes */
        precision?: number;
        /** The scale of the parameter value in bytes */
        scale?: number;
        /** The size of the parameter value in bytes */
        size?: number;
    }

    export interface Connection
    {
        /** Executes a query and returns an is the result set returned by the query as an `Array` */
        query: <T>(command: string, params?: JsCommandParameter[])=>Promise<JsCommand<T>>;
        /** Executes a query command and returns an is the the **number of rows affected** */
        execute: (command: string, params?: JsCommandParameter[])=>Promise<number>;
        /** Executes a query and returns an is the first column of the first row in the result set returned by the query. All other columns and rows are ignored */
        scalar: <T>(command: string, params?: JsCommandParameter[])=>Promise<JsCommand<T>>;
        /** Excutes a stored procedure and returns the number of rows affected */
        procedure: <T>(procedureName: string, params?: JsCommandParameter[])=>Promise<JsCommand<T>>;
        /** Excutes a stored procedure and returns the result */
        procedureScalar: <T>(procedureName: string, params?: JsCommandParameter[])=>Promise<JsCommand<T>>;
        /** Excutes a stored procedure and returns the result */
        transaction: <T>(commands: JsCommand[], params?: JsCommandParameter[])=>Promise<JsCommand<T>>;
    }

    export enum PARAMETER_DIRECTIONS 
    {
        INPUT = 1,
        OUTPUT = 2,
        INPUT_OUTPUT = 3,
        RETURN_VALUE = 6,
    }

    export enum COMMAND_TYPES
    {
        QUERY = 'query',
        SCALAR = 'scalar',
        COMMAND = 'command',
        PROCEDURE = 'procedure',
        PROCEDURE_SCALAR = 'procedure_scalar',
    }

    export function oledbConnection(connectionString: string): Connection;
    export function odbcConnection(connectionString: string): Connection;
    export function sqlConnection(connectionString: string): Connection;
}

export = oledb;
