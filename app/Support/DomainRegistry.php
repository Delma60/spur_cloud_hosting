<?php

namespace App\Support;

/**
 * A stand-in domain registry: TLD pricing + deterministic availability. In
 * production this calls a real registrar API; here it's stable and offline so
 * the search/register flow works end to end. Prices are minor units (kobo).
 */
class DomainRegistry
{
    /** @var array<string,int> price per year, in kobo */
    public const TLDS = [
        'com.ng' => 250000,   // ₦2,500
        'ng' => 500000,       // ₦5,000
        'com' => 1800000,     // ₦18,000
        'io' => 6500000,      // ₦65,000
        'dev' => 2200000,     // ₦22,000
        'app' => 2400000,     // ₦24,000
    ];

    public static function priceFor(string $tld): int
    {
        return self::TLDS[$tld] ?? 1800000;
    }

    /** Strip any TLD/spacing from a raw query to get the base label. */
    public static function label(string $query): string
    {
        $q = strtolower(trim($query));
        $q = preg_replace('/^https?:\/\//', '', $q);
        $q = explode('/', $q)[0];
        // drop a trailing known tld if the user typed one
        foreach (array_keys(self::TLDS) as $tld) {
            if (str_ends_with($q, '.'.$tld)) {
                $q = substr($q, 0, -strlen($tld) - 1);
                break;
            }
        }

        return preg_replace('/[^a-z0-9-]/', '', $q);
    }

    /** Deterministic availability so results are stable across reloads. */
    public static function isAvailable(string $fqdn): bool
    {
        return (hexdec(substr(md5($fqdn), 0, 6)) % 10) > 2; // ~70% available
    }

    /**
     * Search a label across all TLDs.
     * @return array<int,array{fqdn:string,tld:string,available:bool,price:int}>
     */
    public static function search(string $query): array
    {
        $label = self::label($query);
        if ($label === '') {
            return [];
        }

        $results = [];
        foreach (self::TLDS as $tld => $price) {
            $fqdn = "$label.$tld";
            $results[] = [
                'fqdn' => $fqdn,
                'tld' => $tld,
                'available' => self::isAvailable($fqdn),
                'price' => $price,
            ];
        }

        return $results;
    }
}
