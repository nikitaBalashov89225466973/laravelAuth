<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'refresh', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|string',
            'password' => [
                'required',
            ],
            // 'remember' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['errors' => ['email' => ['Указанные учетные данные неверны'] ] ],422);
        }

        return response()->json(['user' => auth()->user(), 'token' => $this->respondWithToken($token)]);
    }
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email'=> 'required|email|string|unique:users,email',
            'password'=> ['required','confirmed', 
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
        ]);

        $user = \App\Models\User::create([
            'name'=> $data['name'],
            'email'=> $data['email'],
            'password'=> bcrypt($data['password']),
        ]);
        $token = auth()->login($user);
        return response()->json(['user' => auth()->user(), 'token' => $this->respondWithToken($token)]);
    
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


}