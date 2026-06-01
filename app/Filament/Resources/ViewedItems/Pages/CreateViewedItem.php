<?php

namespace App\Filament\Resources\ViewedItems\Pages;

use App\Filament\Resources\ViewedItems\ViewedItemResource;
use Filament\Resources\Pages\CreateRecord;

class CreateViewedItem extends CreateRecord
{
    protected static string $resource = ViewedItemResource::class;
}
