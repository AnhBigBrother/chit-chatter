const FunctionWrapper = (controller: Function) => async (req: Request, res: Response) => {
  try {
    const result = await controller(req, res);
    return Response.json(result, { status: result.status || 200 });
  } catch (error: any) {
    return Response.json(
      {
        error: {
          message: error.message || 'Something went wrong!',
          status: error.status || 500,
          issues: error.issues || null,
        },
      },
      { status: error.status || 500 }
    );
  }
};

export { FunctionWrapper };
