<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // Spurs SSO (OIDC client) — accounts is the identity provider.
    'spurs' => [
        'issuer' => rtrim(env('SPURS_ISSUER', 'http://127.0.0.1:8000'), '/'),
        'client_id' => env('SPURS_CLIENT_ID'),
        'client_secret' => env('SPURS_CLIENT_SECRET'),
        'redirect' => env('SPURS_REDIRECT_URI'),
    ],

    // Spurs money layer (private service-to-service APIs).
    'internal_secret' => env('INTERNAL_API_SECRET'),
    'pay' => ['url' => rtrim(env('PAY_INTERNAL_URL', 'http://localhost:3100'), '/')],
    'wallet' => ['url' => rtrim(env('WALLET_INTERNAL_URL', 'http://localhost:3200'), '/')],

];
