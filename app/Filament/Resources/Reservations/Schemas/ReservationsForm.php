<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ViewField;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReservationsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Outer Grid spanning all 3 columns
                Grid::make([
                    'default' => 1,
                    'lg' => 1,
                ])
                    ->schema([
                        // LEFT SIDE: Input Fields (Occupies 2 columns)
                        Grid::make(1)
                            ->schema([
                                Section::make('Reservation Details')
                                    ->icon('heroicon-o-calendar-days')
                                    ->schema([
                                        DatePicker::make('date')
                                            ->label('Select Date')
                                            ->native(false)
                                            ->minDate(now())
                                            ->required()
                                            ->live(),

                                        Select::make('guests')
                                            ->label('Select Guests')
                                            ->required()
                                            ->native(false)
                                            ->prefixIcon('heroicon-m-users')
                                            ->options(
                                                collect(range(1, 10))
                                                    ->mapWithKeys(fn($n) => [$n => $n === 1 ? "1 Person" : "$n People"])
                                                    ->toArray()
                                            )
                                            ->live(),

                                        Select::make('time')
                                            ->label('Select Time')
                                            ->required()
                                            ->native(false)
                                            ->options([
                                                '06:00 PM' => '06:00 PM',
                                                '07:00 PM' => '07:00 PM',
                                                '08:00 PM' => '08:00 PM',
                                            ])
                                            ->live(),
                                    ])->columns(2),

                                Section::make('Contact Information')
                                    ->icon('heroicon-o-user')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->live()
                                            ->placeholder('Full Name'),

                                        TextInput::make('phone')
                                            ->tel()
                                            ->required()
                                            ->live()
                                            ->placeholder('+91 ...'),

                                        Textarea::make('notes')
                                            ->label('Special Notes')
                                            ->placeholder('Any allergies or requests?')
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ])
                            ->columnSpan(['lg' => 2]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
