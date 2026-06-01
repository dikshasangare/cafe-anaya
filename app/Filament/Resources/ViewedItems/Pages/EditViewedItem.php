<?php

namespace App\Filament\Resources\ViewedItems\Pages;

use App\Filament\Resources\ViewedItems\ViewedItemResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditViewedItem extends EditRecord
{
    protected static string $resource = ViewedItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
